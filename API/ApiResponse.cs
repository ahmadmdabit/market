namespace API
{
    public class ApiResponse
    {
        public bool Status { get; set; }
        public object Data { get; set; }
        public ErrorResult Error { get; set; }

        public ApiResponse()
        {
        }

        public ApiResponse(bool status, object data, ErrorResult error)
        {
            this.Status = status;
            this.Data = data;
            this.Error = error;
        }

        public ApiResponse(bool status, object data, int errorCode, string errorMessage)
        {
            this.Status = status;

            this.Data = data;

            this.Error = new ErrorResult(errorCode, errorMessage);
        }
    }
}