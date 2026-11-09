use tauri::command;
use reqwest::Client;
use reqwest::header::{HeaderMap, HeaderValue, CONTENT_TYPE, USER_AGENT, ACCEPT, ORIGIN, REFERER, AUTHORIZATION};
use serde::{Deserialize, Serialize};
use serde_json::Value;

const HOST_URL: &str = "https://kundoluk.edu.gov.kg";

#[derive(Deserialize, Serialize)]
pub struct Credentials {
    pub username: String,
    pub password: String,
}

#[command]
async fn login(url: String, credentials: Credentials) -> Result<String, String> {
    let client = Client::new();
    let mut headers = HeaderMap::new();
    headers.insert(CONTENT_TYPE, HeaderValue::from_static("application/json; charset=utf-8"));
    headers.insert(USER_AGENT, HeaderValue::from_static("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"));
    headers.insert(ACCEPT, HeaderValue::from_static("application/json, text/plain, */*"));
    headers.insert(ORIGIN, HeaderValue::from_static("https://kundoluk.edu.gov.kg"));
    headers.insert(REFERER, HeaderValue::from_static("https://kundoluk.edu.gov.kg/"));

    let response = client.post(&url)
        .headers(headers)
        .json(&credentials)
        .timeout(std::time::Duration::from_secs(10))
        .send()
        .await
        .map_err(|err| format!("Ошибка отправки запроса: {}", err))?;

    let text = response
        .text()
        .await
        .map_err(|err| format!("Ошибка чтения ответа: {}", err))?;

    Ok(text)
}

async fn proxy_get(path: &str, auth: Option<String>, query: Option<Vec<(String, String)>>) -> Result<Value, String> {
    let client = Client::new();
    let mut req = client.get(format!("{}{}", HOST_URL, path));

    if let Some(token) = auth {
        req = req.header(AUTHORIZATION, token);
    }

    if let Some(q) = query {
        req = req.query(&q);
    }

    let response = req.send().await.map_err(|e| e.to_string())?;
    let data = response.json::<Value>().await.map_err(|e| e.to_string())?;
    
    Ok(data)
}

#[command]
async fn get_qmarks(auth: Option<String>, query: Option<Vec<(String, String)>>) -> Result<Value, String> {
    proxy_get("/api/student/qmarks/all", auth, query).await
}

#[command]
async fn get_grade_list(auth: Option<String>, query: Option<Vec<(String, String)>>) -> Result<Value, String> {
    proxy_get("/api/student/gradebook/list", auth, query).await
}

#[command]
async fn get_grade_term_1(auth: Option<String>, query: Option<Vec<(String, String)>>) -> Result<Value, String> {
    proxy_get("/api/student/gradebook/term/1", auth, query).await
}

#[command]
async fn get_grade_term_2(auth: Option<String>, query: Option<Vec<(String, String)>>) -> Result<Value, String> {
    proxy_get("/api/student/gradebook/term/2", auth, query).await
}

#[command]
async fn get_grade_term_3(auth: Option<String>, query: Option<Vec<(String, String)>>) -> Result<Value, String> {
    proxy_get("/api/student/gradebook/term/3", auth, query).await
}

#[command]
async fn get_grade_term_4(auth: Option<String>, query: Option<Vec<(String, String)>>) -> Result<Value, String> {
    proxy_get("/api/student/gradebook/term/4", auth, query).await
}

#[command]
async fn get_homework(auth: Option<String>, query: Option<Vec<(String, String)>>) -> Result<Value, String> {
    proxy_get("/api/student/homework/list", auth, query).await
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            login,
            get_qmarks,
            get_grade_list,
            get_grade_term_1,
            get_grade_term_2,
            get_grade_term_3,
            get_grade_term_4,
            get_homework
        ])
        .run(tauri::generate_context!())
        .expect("error while building tauri application");
}
