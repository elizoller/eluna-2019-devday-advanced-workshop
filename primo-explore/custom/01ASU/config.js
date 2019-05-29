const config = {
  stage: {
    aws_url: 'https://aywaslmqg3.execute-api.us-east-2.amazonaws.com/twilioStage/sms',
    aws_api_key: '4rUn2NA7di1WqJkmytwMh2AbCQ3PBK5h2EeNGnTJ'
  },
  prod: {
    aws_url: 'https://hvaznllb5b.execute-api.us-east-2.amazonaws.com/twilioProd/sms',
    aws_api_key: '0kFDfi1Ltja32NIYtepvX3IMatSkngUq1LzawvZC'
  }
}
module.exports = config;
