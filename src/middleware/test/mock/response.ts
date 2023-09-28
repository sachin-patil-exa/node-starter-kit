const response: any = {
  responseStatus: 0,
  body: null,
  status(responseStatus: number) {
    this.responseStatus = responseStatus;
    return this;
  },
  json(json: any) {
    this.body = json;
    return this;
  },
};

export default response;
