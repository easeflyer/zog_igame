from fabric.api import *
# 自动化部署脚本
# _itable 游戏大厅
# _imatch 比赛成绩查询
# _igame  游戏比赛



env.hosts = ['139.198.21.140']
env.port = '22'
env.user = 'ubuntu'
env.password = 'Odooht163icp'

# fab hello:a=11,b=22
def hello(a,b):
  print("hello world!{}-{}".format(a,b))
# 自动命令示例
def list(dir="/home/s1/zog_igame/frontend/bridge_gui"):
  with cd(dir):
    run('ls -l')
    run('exit')

# 自动部署
def deploy(app='igame'):
  eval("_"+app)()
  run('exit')


def _itable():
  with cd("/opt/odoo/zog_igame/fronend/itable"):
    sudo('git checkout develop')
    sudo('git pull origin develop')
    sudo('yarn install')
    sudo('yarn build')
def _imatch():
  with cd("/opt/odoo/zog_igame/fronend/imatch"):
    sudo('git checkout develop')
    sudo('git pull origin develop')
    sudo('yarn install')
    sudo('yarn build')

def _odoo():
  with cd("/opt/odoo/zog_igame/"):
    sudo('git checkout develop')
    sudo('git pull origin develop')

def _igame():
  with cd("/home/ubuntu/zog_igame/frontend/bridge_gui"):
    sudo('git fetch origin test1')
    sudo('git checkout test1')
    sudo('git pull origin test1')
    sudo('yarn install')
    sudo('yarn build')