// AWS.config.region = '<REGION>';
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//   IdentityPoolId: '<IDENTITY_POOL_ID>'
// });
// AWS.config.update(
//   {
//     accessKeyId: "AKIA4T2RLXBEA3M2SN4H",
//     secretAccessKey: "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",
//   }
// );
var lambda = new AWS.Lambda();

const login = async()=> {

  var result = document.getElementById('result');
  var email = document.getElementById('email');
  var password = document.getElementById('password');
  var type = document.getElementById('type');

  

  if (email.value == null || email.value == '') {
    result.innerHTML = 'Please specify your email address.';
  } else if (password.value == null || password.value == '') {
    result.innerHTML = 'Please specify a password.';
  } else {

    var input = {
      email: email.value,
      password: password.value
    };
    
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json' ,
       
      },
      
    };

   
    var url="https://55mk0uwqc0.execute-api.us-east-1.amazonaws.com/prod/v1?userid="+email.value+"&password="+password.value

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          var response_from_init_split = data[0]["data"]["PreSigned"].split('?');
          var apiToken=data[0]["data"]["apikey"]
          var loginparamter=data[0]["data"]["login"]
          var parameter=response_from_init_split[1]
          if (loginparamter==true){
            // window.open('../../index.html', '_self');
                window.location.href ='../../index.html?username='+email.value+'&usertype='+type.value+'&'+parameter+'&apitoken='+apiToken;
                // window.location.href =data[0]["data"]["PreSigned"]+'&username='+email.value+'&usertype='+type.value+'&apitoken='+apiToken;
            }
            else {
                        result.innerHTML = '<b>Not</b> logged in';
            }
        })

    const response_from_init = await fetch(url,requestOptions)
    const data = response_from_init.json();
    console.log("=======response----------")
    var response_from_init_split = data[0]["data"]["PreSigned"].split('?');
    var loginparamter=data[0]["data"]["login"]
    var parameter=response_from_init_split[1]
    console.log(response_from_init)
    // window.location.href ='../../index.html?username='+email.value+'&usertype='+type.value;


    // var url="https://ibsh7lbab6.execute-api.us-east-1.amazonaws.com/prod/v1"
    // const response_from_init = await fetch(url,requestOptions)
    // const data = await response_from_init.json();
    // console.log("=======response from webAuth------------")
    // console.log(data)
    if (loginparamter==true){
    // window.open('../../index.html', '_self');
        window.location.href ='../../index.html?username='+email.value+'&usertype='+type.value+'&'+parameter;
    }
    else {
                result.innerHTML = '<b>Not</b> logged in';
    }

    // fetch(url, requestOptions)
    //     .then(response => response.json())
    //     .then(data => {
    //       var output = JSON.parse(data.Payload);
    //       if (!output.login) {
    //         result.innerHTML = '<b>Not</b> logged in';
    //       } else {
    //         //result.innerHTML = 'Logged in with IdentityId: ' + output.identityId + '<br>';

    //         // var creds = AWS.config.credentials;
    //         // creds.params.IdentityId = output.identityId;
    //         // creds.params.Logins = {
    //         //   'cognito-identity.amazonaws.com': output.token
    //         // };
    //         // creds.expired = true;
    //         window.open('../../index.html', '_self');
    //         // window.location.href ='../../index.html';
    //         // Do something with the authenticated role

    //       }

    //     })
    

    // lambda.invoke({
    //   FunctionName: 'Function_vbs_web_auth_login',
    //   Payload: JSON.stringify(input)
    // }, function(err, data) {
    //   if (err) console.log(err, err.stack);
    //   else {
    //     var output = JSON.parse(data.Payload);
    //     if (!output.login) {
    //       result.innerHTML = '<b>Not</b> logged in';
    //     } else {
    //       result.innerHTML = 'Logged in with IdentityId: ' + output.identityId + '<br>';

    //       // var creds = AWS.config.credentials;
    //       // creds.params.IdentityId = output.identityId;
    //       // creds.params.Logins = {
    //       //   'cognito-identity.amazonaws.com': output.token
    //       // };
    //       // creds.expired = true;
    //       window.location.href ='../../index.html';
    //       // Do something with the authenticated role

    //     }
    //   }
    // });

	}
}

var form = document.getElementById('login-form');
form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  login();
});
