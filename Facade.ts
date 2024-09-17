type BL = {
    blNo: string;
    bkNo: string;
}

interface Bill_Of_Lading_Class {
    getBillOfLading(): BL[];
}

class Bill_Of_Lading_Class implements Bill_Of_Lading_Class {
    getBillOfLading(): BL[] {
        return [];
    }
}

type Rule = {
    name: string;
    value: string;
}

interface Validation_Rule_Class {
    getRules(): Rule[];
}

class Validation_Rule_Class implements Validation_Rule_Class {
    getRules(): Rule[] {
        return [];
    }
}

interface Validation_BL_Error_Class {
    getBlError(): Record<string, unknown>;
}

class Validation_BL_Error_Class implements Validation_BL_Error_Class {
    getBlError(): Record<string, unknown> {
        return {};
    }
}

interface AMS_Submission_Aggregate_Root_Facade {
   getBillOfLading(): BL[];
   getRules(): Rule[];
   getBlError(): Record<string, unknown>;
}

class AMS_Submission_Aggregate_Root_Facade implements AMS_Submission_Aggregate_Root_Facade {
    private billOfLading: Bill_Of_Lading_Class;
    private validationRule: Validation_Rule_Class;
    private validationBLError: Validation_BL_Error_Class;

    constructor() {
        this.billOfLading = new Bill_Of_Lading_Class();
        this.validationRule = new Validation_Rule_Class();
        this.validationBLError = new Validation_BL_Error_Class();
    }

    getBillOfLading(): BL[] {
        return this.billOfLading.getBillOfLading();
    }
    getRules(): Rule[] {
        return this.validationRule.getRules();
    }
    getBlError(): Record<string, unknown> {
        return this.validationBLError.getBlError();
    }
}