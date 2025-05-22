//This object will be used to transfer the data through components
//Note that this is not according to the name conventions, but that is no issue since
//these are notated just like in the database.
export type DryingProfile = {
    ID: string,
    Name: string,
    Target_temperature: number,
    Target_duration: number,
    Mode: string,
    Storage_temperature: number,
    Customizable: boolean,
    User_Id: string
}