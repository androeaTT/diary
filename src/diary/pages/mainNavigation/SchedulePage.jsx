import {SpringButton} from "../../elements/SpringButton.jsx";
import {Genetics, Biotech} from "@nine-thirty-five/material-symbols-react/rounded";
import {useState} from "react";

export default function SchedulePage(props) {
    const [selected, setSelected] = useState(0);
    return (
        <div className='flex flex-row items-center justify-center h-dvh'>
            <SpringButton
                icon={<Genetics />}
                label="Genetics"
                variant={ selected === 0 ? 'filled' : 'flat'}
                onClick={() => setSelected(0)}
            />
            <SpringButton
                // icon={<Biotech />}

                label="Biotech"
                variant={ selected === 1 ? 'filled' : 'flat'}
                onClick={() => setSelected(1)}
            />
            <SpringButton
                icon={<Biotech />}

                // label="Biotech"
                variant={ selected === 3 ? 'filled' : 'flat'}
                onClick={() => setSelected(3)}
            />
        </div>
    )
}