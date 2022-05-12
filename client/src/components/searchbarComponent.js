import { 
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxOption,
} from "@reach/combobox";

function SearchBar(props){

    return(
        <div className="search-bar-component">
            <Combobox onSelect={props.selectPlace} >
                <ComboboxInput
                    value={props.selectPlace.address}
                    onChange={(e) => props.setValue(e.target.value)}
                    disabled={!props.ready}
                    placeholder="Search a place!"
                    id="search-bar-input"
                    autoComplete="off"                    
                />
                <ComboboxPopover >
                    {props.status === "OK" && props.data.map(({ place_id, description, }) => ( 
                        <ComboboxOption key={place_id} value={description} autoComplete="off" />
                    ))}
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}

export default SearchBar;