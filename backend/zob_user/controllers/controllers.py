# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

import logging
_logger = logging.getLogger(__name__)

from odoo import http
from odoo.http import request
from odoo.service import security

from odoo import SUPERUSER_ID, registry, api

class JsonApi(http.Controller):
    @http.route('/json/test1',type='json', auth='none',cors='*',csrf=False)
    def test1(self,**kw):
        return "hello!"

    @http.route('/json/api',type='json', auth='user', cors='*', csrf=False )
    def json_api(self, model, method,args, kw):
        return api.call_kw(request.env[model],method,args,kw)

    @http.route('/json/user/register',type='json', auth='none', cors='*', csrf=False )
    def register(self,db,login,password):
        with registry(db).cursor() as cr:
            env = api.Environment(cr, SUPERUSER_ID, {})
            return env['res.users'].register(login,password)

    @http.route('/json/user/reset/password',type='json', auth='none', cors='*', csrf=False )
    def reset_psw(self,db,login,password):
        with registry(db).cursor() as cr:
            env = api.Environment(cr, SUPERUSER_ID, {})
            return env['res.users'].reset_new_password(login,password)

    @http.route('/json/user/login',type='json', auth='none', cors='*', csrf=False )
    def login(self,db,login,password):
        uid = http.request.env['res.users'].authenticate(
                     db,login,password,None )
        if not uid:return False

        session = http.request.session
        session.db = db
        session.uid = uid
        session.login = login
        session.session_token = uid and security.compute_session_token(session)
        session.context = http.request.env['res.users'].context_get() or {}
        session.context['uid'] = uid
        session._fix_lang(session.context)
        http.root.session_store.save(session)
        return { 'sid': session.sid }  # user info

