var base = process.env.NODE_ENV;

var http = {
	"base" : base,
	"get" : (vthis,url,params)=>{
		var url = http.base + "/" + url
		return vthis.$http.get(url,{
			params : params || {},
			headers : {
                'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
            }
		})
	},
	"post" : (vthis,url,params)=>{
        
		var url = http.base + "/" + url
		return vthis.$http.post(url,params,{
            headers :{
				'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
			},

            transformRequest : [function(data){
                var ret = ''
                for (var it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }]
		})
	},
	"postImg" : (vthis,url,params)=>{
        
		var url =  url
		return vthis.$http.post(url,params,{
            headers :{
				'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
			},

            transformRequest : [function(data){
                var ret = ''
                for (var it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }]
		})
	},
	"put" : (vthis,url,params) => {
		var url = http.base + "/" + url

		return vthis.$http.put(url,params,{
            headers :{
				'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
			},

            transformRequest : [function(data){
                var ret = ''
                for (var it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }]
		})
	},
	"delete" : (vthis,url) => {
		var url = http.base + "/" + url

		return vthis.$http.delete(url,{
            headers :{
				'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
			}
		})
	},
	alive : function(vthis,callback,redirect){
		if(localStorage.getItem("access_token") == undefined){
			if(redirect){
                location.href = "#/home"
				vthis.$notify.error({
					title : "提示",
					message : "令牌已失效,请重新登录"
				})
			}
			return false
		}
		var url = http.base + "/admin_alive"
		var redirect = (redirect == undefined) ? true : redirect
		vthis.$http.get(url,{
			headers : {
				'Authorization' : 'Bearer ' + localStorage.getItem("access_token")
			}
		}).then(function(res){
			var data = res.data
			if (data.code == "token_fail") {
				location.href = "#/login"
				if(redirect){
					vthis.$notify.error({
						title : "提示",
						message : "令牌已失效,请重新登录"
					})
				}
			}
			else{
				callback()
			}
		})
	}
}
export default http
