export function InputBox({label, placeholder, onChange}) {
    return <div>
        <div className="">
            {label}
        </div>
        <input type="text" onChange={onChange} placeholder={placeholder} className=""/>
    </div>
}