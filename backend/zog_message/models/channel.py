# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models

import logging
_logger = logging.getLogger(__name__)

class GameChannel(models.Model):
    _name = "og.channel"

    name = fields.Char(related='mail_channel_id.name')
    igame_id = fields.Many2one('og.igame')
    table_id = fields.Many2one('og.table')
    mail_channel_id = fields.Many2one('mail.channel')
    type = fields.Selection([('all',       'To All'),
                             ('spectator', 'To All Spectators'),
                             ('one',       'To One Spectator'),
                             ('player',    'To All Player'),
                             ('opps',      'To Opps'),
                             ('lho',       'To LHO'),
                             ('rho',       'To RHO'),

                             ], default='all')



    @api.multi
    def message_get(self, message_id ):
        self = self.sudo()

        # TBD,  message format
        msg = self.env['mail.message'].browse(message_id)
        #print(msg)
        subject = msg.subject
        body = msg.body
        game = self.igame_id
        table = self.table_id
        return {'table_id':table.id, 'game_id':game.id,
                'test1': subject, 'test2': body }


    @api.multi
    @api.returns('self', lambda value: value.id)
    def message_post(self, body='', subject=None ):
        self = self.sudo()
        return self.mail_channel_id.message_post(body=body, subject=subject,
                      message_type='comment', subtype='mail.mt_comment')

    @api.model
    @api.returns('self')
    def create_igame_channel(self,name,igame_id, partner_ids):
        mail_channel = self._create_mail_channel(name,partner_ids)
        vals = {'igame_id' : igame_id,
                'mail_channel_id': mail_channel.id }

        return self.create(vals)

    @api.model
    @api.returns('self')
    def create_table_channel(self,name,table_id, partner_ids):
        mail_channel = self._create_mail_channel(name,partner_ids)
        vals = {'table_id' : table_id,
                'mail_channel_id': mail_channel.id }

        return self.create(vals)


    def _create_mail_channel(self,name,partner_ids):
        channel_vals = {
            'name' : name,
            'public':'private',
            'channel_partner_ids': (6,0,partner_ids)
        }

        return self.env['mail.channel'].create(channel_vals)

