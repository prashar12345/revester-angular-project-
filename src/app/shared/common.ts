export class StateData {
    postalCode: string;
    investorType: string;
    freeSearch: boolean;
    loader: boolean;
    isLoggedIn: boolean;
    user: any;
    userId: any;
    budgetHardCostSubmit: boolean;
    budgetData: any;
    subcriptionStatus: any;
    subcriptionValid: any;
    shineItem: number[];
    constructor() {
        this.postalCode = "";
        this.investorType = "";
        this.freeSearch = false;
        this.loader = false;
        this.isLoggedIn = false;
        this.user;
        this.budgetHardCostSubmit = false;
        this.shineItem = [1, 2, 3, 4, 5, 6, 7, 8, 9,];
        this.subcriptionStatus = false;
        this.subcriptionValid;
        this.budgetData = "";
    }
}