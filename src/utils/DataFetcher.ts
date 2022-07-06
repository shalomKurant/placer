import { NASAMeteorsUrl } from "../configs/APIConfigs";
import { IMeteor } from "../types/IMeteor";

export const getMeteors = async (): Promise<Array<IMeteor>> => {
    const meteorsResponse = await fetch(NASAMeteorsUrl);
    return meteorsResponse.json();
}