namespace NP
{
    export class AJAX
    {
        // XMLHTTPRequest container
        private Request: XMLHttpRequest;
        private Callbacks: any;
        private Headers: any;
        private URL: string;
        private Send: string = null;
        private Asynchronous: boolean = true;

        // Prepares the XMLHttpRequest and stuff
        constructor(async: boolean = true) {
            this.Request = new XMLHttpRequest();
            this.Callbacks = new Object();
            this.Headers = new Object();
            this.Asynchronous = async;
        }

        // Start
        public Start(method: HTTPMethod, avoidCache: boolean = false): void {
            // Open the connection
            this.Request.open(HTTPMethod[method], this.URL + (avoidCache ? "?no-cache=" + Date.now() : ""), this.Asynchronous);

            // Set headers
            this.PrepareHeaders();

            // Watch the ready state
            this.Request.onreadystatechange = () => {
                // Only invoke when complete
                if (this.Request.readyState === 4) {
                    // Check if a callback if present
                    if ((typeof this.Callbacks[this.Request.status]).toLowerCase() === 'function') {
                        this.Callbacks[this.Request.status]();
                    } else { // Else check if there's a generic fallback present
                        if ((typeof this.Callbacks['0']).toLowerCase() === 'function') {
                            // Call that
                            this.Callbacks['0']();
                        }
                    }
                }
            }

            this.Request.send(this.Send);
        }

        // Stop
        public Stop(): void {
            this.Request = null;
        }

        // Add post data
        public SetSend(data: any): void {
            // Storage array
            var store: Array<string> = new Array<string>();

            // Iterate over the object and them in the array with an equals sign inbetween
            for (var item in data) {
                store.push(encodeURIComponent(item) + "=" + encodeURIComponent(data[item]));
            }

            // Assign to send
            this.Send = store.join('&');
        }

        // Set raw post
        public SetRawSend(data: string): void {
            this.Send = data;
        }

        // Get response
        public Response(): string {
            return this.Request.responseText;
        }

        // Get all headers
        public ResponseHeaders(): string {
            return this.Request.getAllResponseHeaders();
        }

        // Get a header
        public ResponseHeader(name: string): string {
            return this.Request.getResponseHeader(name);
        }

        // Set charset
        public ContentType(type: string, charset: string = null): void {
            this.AddHeader('Content-Type', type + ';charset=' + (charset ? charset : 'utf-8'));
        }

        // Add a header
        public AddHeader(name: string, value: string): void {
            // Attempt to remove a previous instance
            this.RemoveHeader(name);

            // Add the new header
            this.Headers[name] = value;
        }

        // Remove a header
        public RemoveHeader(name: string): void {
            if ((typeof this.Headers[name]).toLowerCase() !== 'undefined') {
                delete this.Headers[name];
            }
        }

        // Prepare Request headers
        public PrepareHeaders(): void {
            for (var header in this.Headers) {
                this.Request.setRequestHeader(header, this.Headers[header]);
            }
        }

        // Adds a callback
        public AddCallback(status: number, callback: Function): void {
            // Attempt to remove previous instances
            this.RemoveCallback(status);

            // Add the new callback
            this.Callbacks[status] = callback;
        }

        // Delete a callback
        public RemoveCallback(status: number): void {
            // Delete the callback if present
            if ((typeof this.Callbacks[status]).toLowerCase() === 'function') {
                delete this.Callbacks[status];
            }
        }

        // Sets the URL
        public SetUrl(url: string): void {
            this.URL = url;
        }
    }
}
