'''
注意配置青云防火墙规则 打开对 22 和 80 的限制。
添加下行规则 允许80,8082,8069

部署命令：
fab -f server140.py deploy:itable
fab -f server140.py deploy:igame
fab -f server140.py deploy:imatch
'''

from fabric.api import *

env.hosts = ['139.198.21.140']
env.port = '22'
env.user = 'ubuntu'
env.password = 'Odooht163icp'

# 参数示例
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

#################################################################
def _itable():
  with cd("/home/ubuntu/gameLobby"):
    #run('git reset --hard HEAD')
    sudo('git checkout master')
    sudo('git pull origin master')
    #sudo('rm -rf build/')
    sudo('yarn install')
    sudo('yarn build')
    sudo('rm -rf /var/www/itable')
    sudo('ln -s /home/ubuntu/gameLobby/dist /var/www/html/itable')
    # sudo('rm -rf /var/www/bridge_bui1/itable')
    # sudo('cp -r dist/ /var/www/bridge_bui1/itable')


# 计划修改为软连接版本。
def _igame():
  with cd("/home/ubuntu/zog_igame/frontend/bridge_gui"):
    #run('git reset --hard HEAD')
    sudo('git checkout bui-mobx-test1') # 考虑先 fetch 再 checkout 替代 pull
    sudo('git pull origin bui-mobx-test1')
    sudo('yarn install')
    sudo('yarn build')
    sudo('rm -rf /var/www/html/igame')
    sudo('ln -s /home/ubuntu/zog_igame/frontend/bridge_gui/build /var/www/html/igame')
    # sudo('rm -rf /var/www/bridge_bui1/igame')
    # sudo('mv build/ /var/www/bridge_bui1/igame')

def _imatch():

  with cd("/opt/odoo/zog_igame/fronend/imatch"):
    #sudo('git reset --hard HEAD')
    sudo('git checkout develop')
    sudo('git pull origin develop')
    sudo('yarn install')
    sudo('yarn build')
    sudo('rm -rf /var/www/imatch')
    sudo('ln -s /opt/odoo/zog_igame/fronend/imatch/dist/ /var/www/html/imatch')

