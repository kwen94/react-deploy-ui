from flask import Flask, request
import time


OPERATE = {
	"测试": {
		"env_list": {
			"test1": ["test1_app1", "test1_app2", "test1_app3", "hahaha_app4"],
			"test2": ["test2_app1", "test2_app2", "test2_app3", "as_app4"],
			"default": ["default_app1", "default_app2", "default_app3"],
			"default222": ["default222_app1", "default222_app2", "default222_app3"]
		}
	},
	"开发": {
		"env_list": {
			"dev1": ["dev1_app1", "dev1_app2", "dev1_app3", "hahaha_app3"],
			"dev2": ["dev2_app1", "dev2_app2", "dev2_app3",  "hahaha_app3"],
			"alpha": ["alpha_app1", "alpha_app2", "alpha_app3"]
		}
	},
	"前端": {
		"env_list": {
			"fe": ["fe_app1", "fe_app2", "fe_app3", "hahaha_app3"],
			"fe2": ["fe_app1", "fe_app2", "fe_app3",  "hahaha_app3"]
		}
	}
}


app = Flask(__name__)
app.config['DEBUG'] = True

# app.config.from_pyfile('config.py')

@app.route('/api/v1/deploy/getOperate', methods=['GET'])
def getOperate():
    return {
		"result": 0,
		"data": {
			"current_operate": "开发",
			"operate_info": OPERATE
		}
	}

@app.route('/api/v1/deploy/getCurrenttag', methods=['GET'])
def getCurrenttag():
    deploy_env =  request.args.get('deploy_env')
    app = request.args.get('app')
    time.sleep(3)
    return {
        "result": 0,
        "data": deploy_env + ":" + app
    }

@app.route('/api/v1/deploy/getTagList', methods=['GET'])
def getTagList():
    app = request.args.get('app')

    import time
    time.sleep(2)

    if app == "hahaha_app3":
        return {
            "result": 0,
            "data": []
        }

    app = app.partition('_')[2]
    all_list = ["{}-1".format(app), "{}-2".format(app), "{}-3".format(app), "{}-4".format(app)]

    return {
        "result": 0,
        "data": all_list
    }

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='9000')