export default interface Feedback{
    FeedbackID: number;
    CustomerID: number;
    Name: string;
    Comments: string;
    Response?: string;
    Rating?:number;
}