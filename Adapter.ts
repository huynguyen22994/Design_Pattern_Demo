const Vessel_ODS_Data_String = `
    {
        "vessels": [
            {
                "id": 1,
                "name": "Vessel 1",
                "type": "Bulk"
            },
            {
                "id": 2,
                "name": "Vessel 2",
                "type": "Container"
            }
        ]
    }
`

interface Vessel_Adapter {
    getVesselsConverted(): { vessels: Record<string, { id: number, name: string, type: string }[]> }
}

class Vessel_Adapter implements Vessel_Adapter {
    public getVesselsConverted() {
        return JSON.parse(Vessel_ODS_Data_String);
    }
}

interface Vessel_Class {
    getBulkVessel(): Record<string, { id: number, name: string, type: string }[]>;
    getContainerVessel(): Record<string, { id: number, name: string, type: string }[]>;
}

class Vessel_Class implements Vessel_Class {
    constructor(private vesselAdapter: Vessel_Adapter) {
        this.vesselAdapter = new Vessel_Adapter();
    }
    public getBulkVessel() {
        return this.vesselAdapter.getVesselsConverted().vessels.filter((vessel: Record<string, unknown>) => vessel.type === "Bulk");
    }
    public getContainerVessel() {
        return this.vesselAdapter.getVesselsConverted().vessels.filter((vessel: Record<string, unknown>) => vessel.type === "Container");
    }
}
const vessel_class = new Vessel_Class(new Vessel_Adapter());