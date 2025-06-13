//This object will be used to transfer the data through components
//Note that this is not according to the name conventions, but that is no issue since
//these are notated just like in the database.
export type DryingProfile = {
    ID: string,
    Name: string,
    Mode: string,
    Customizable: boolean,
    User_id: string,
    Drying_profile_mode_id: string
}

export type DryingMode = {
    ID: string,
    Name: string,
    Target_temperature: number,
    Target_duration: number,
}