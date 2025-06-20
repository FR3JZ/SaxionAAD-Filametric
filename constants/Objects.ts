//This object will be used to transfer the data through components
//Note that this is not according to the name conventions, but that is no issue since
//these are notated just like in the database.
export type DryingProfile = {
    ID: string,
    Name: string,
    Mode: string,
    Customizable: boolean,
    User_id: string,
    Drying_profile_mode_id: string,
}

export type DryingMode = {
    ID: string,
    Name: string,
    Target_temperature: number,
    Target_duration: number,
}

export type Device = {
    ID: string,
    Shadow: any,
}

/**
 * A log of information send by the dryer
 */
export type DryerLog = {
  temperature: number,
  humidity: number,
  completedCycles: number,
  timestamp: Date,
}

/**
 * All the data needed to fill the stats page
 */
export type StatsData = {
  humidityReductionPercentage: number,
  completedCycles: number,
  wrtHumidity: number,
  wrtCycles: number,
  temperaturePeriodArray: GraphData,
  humidityPeriodArray: GraphData,
}

/**
 * All the data needed to fill a graph
 */
export type GraphData = {
  timestamp:string[],
  value:number[],
}
