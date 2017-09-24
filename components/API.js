/* 
  Methods to handle signed API requests
*/
import aws4 from 'aws4';
import URI from 'urijs';

import moment from 'moment';

class API {
  static getSignedHTTPRequest(url, data) { // secure sign requests to AWS API Gateway and return custom headers
    const awsDate = moment().utc().format('YYYYMMDD[T]HHmmss[Z]'); //20170818T150422Z

    const uri = new URI(url);
    let request = {
      path: uri.pathname() + uri.search(),
      url: url,
      host: uri.hostname(),
      method: 'POST',
      service: 'execute-api',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'multipart/form-data',
        'X-Amz-Date': awsDate,
      },
      region: 'eu-west-1',
      body: data,
    };
    let signedRequest = aws4.sign(request, {
      secretAccessKey: "XX",
      accessKeyId: "XX",
    });
    delete signedRequest.headers['Host'];

    return signedRequest;
  }
}
export default API;