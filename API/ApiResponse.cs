namespace API
{
    public class ApiResponse
    {
        public bool Status { get; set; }
        public object Data { get; set; }
        public string Error { get; set; }
    }
}