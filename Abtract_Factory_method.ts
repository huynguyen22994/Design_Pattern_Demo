interface AMS {
    save(): AMS;
    update(): AMS;
    notify(): AMS;
}

class AMS implements AMS {
    public save(): AMS {
        throw new Error("Method not implemented."); // implement logic
    }
    public update(): AMS {
        throw new Error("Method not implemented."); // implement logic
    }
    public notify(): AMS {
        throw new Error("Method not implemented."); // implement logic
    }
}

interface AMS_Pending extends AMS {
    save(): AMS_Pending;
    cancel(): AMS_Pending;
}

class AMS_Pending implements AMS_Pending {
    public save(): AMS_Pending {
        throw new Error("Method not implemented."); // implement logic
    }
    public cancel(): AMS_Pending {
        throw new Error("Method not implemented."); // implement logic
    }
}

interface AMS_Failed extends AMS {
    save(): AMS_Failed;
    resend(): AMS_Failed;
}

class AMS_Failed implements AMS_Failed {
    public save(): AMS_Failed {
        throw new Error("Method not implemented."); // implement logic
    }
    public resend(): AMS_Failed {
        throw new Error("Method not implemented."); // implement logic
    }
}

interface AMS_Successed extends AMS {
    save(): AMS_Successed;
}

class AMS_Successed implements AMS_Successed {
    public save(): AMS_Successed {
        throw new Error("Method not implemented."); // implement logic
    }
}

interface AMS_Factory {
    getAMSSuccessed(): AMS_Successed;
    createAMSPending(): AMS_Pending;
    createAMSFalied(): AMS_Failed;
}

class AMS_Factory implements AMS_Factory {
    public getAMSSuccessed(): AMS_Successed {
        return new AMS_Successed();
    }
    public createAMSPending(): AMS_Pending {
        return new AMS_Pending();
    }
    public createAMSFalied(): AMS_Failed {
        return new AMS_Failed();
    }
}

interface AMS_Schedule_Factory {
    amsFactory: AMS_Factory;
    getAMSSchedule(): AMS_Successed | AMS_Pending | AMS_Failed;
    createAMSScheduleCustome(): Record<string, unknown>;
}

class AMS_Schedule_Factory implements AMS_Schedule_Factory {
    public amsFactory: AMS_Factory;
    constructor() {
        this.amsFactory = new AMS_Factory();
    }
    public getAMSSchedule(): AMS_Successed | AMS_Pending | AMS_Failed {
        return this.amsFactory.getAMSSuccessed();
    }
    public createAMSScheduleCustome(): Record<string, unknown> {
        const ams = this.amsFactory.createAMSPending();
        return { data: ams };
    }
}