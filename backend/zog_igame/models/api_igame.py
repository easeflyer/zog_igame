# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models

class IntelligentGameApi(models.Model):
    _inherit = "og.igame"

    @api.model
    @api.returns('self')
    def create_bridge_team(self,name,org_type=None, score_uom=None):
        vals = {'name':name, 'game_type':'bridge', 'match_type':'team'}
        if org_type: vals['org_type'] = org_type
        if score_uom: vals['score_uom'] = score_uom
        gid = self.create(vals)
        return gid

    @api.model
    @api.returns('self')
    def create_child(self,name,parent_id,org_type=None,sequence=None):
        vals = {'name':name, 'parent_id': parent_id}
        parent = self.env['og.igame'].browse(parent_id)
        vals['game_type'] = parent.game_type
        vals['match_type'] = parent.match_type
        if org_type: vals['org_type'] = org_type
        if sequence: vals['sequence'] = sequence
        vals['score_uom'] = parent.score_uom
        return self.create(vals)

    @api.model
    @api.returns('self')
    def search_bridge_team(self,domain):
        self = self.sudo()
        dm = [('parent_id','=',None),('game_type','=','bridge'),
              ('match_type','=','team')  ] + domain
        gms = self.env['og.igame'].search(dm)
        return gms  #self.env['og.igame'].browse(gid)
        #return [{'name':gm.name, 'id':gm.id}  for gm in gms ]

    @api.model
    @api.returns('self')
    def register1(self,game_id):
        me = self.env.user
        partner_id = me.parent_id.id
        self = self.sudo()
        game = self.env['og.igame'].browse(game_id)
        sc = self.env['og.igame.score'].search([('igame_id','=',game_id),
                                    ('partner_id','=',partner_id)])
        if not sc:
            ret = self.env['og.igame.score'].create(
                    {'igame_id':game_id,'partner_id':partner_id }) 

        return game

    @api.multi
    @api.returns('self')
    def register(self):
        me = self.env.user
        partner_id = me.parent_id.id
        self = self.sudo()
        sc = self.score_ids.filtered(
             lambda sc1: sc1.partner_id.id == partner_id)
        if not sc:
            sc = self.env['og.igame.score'].create(
                    {'igame_id':self.id,'partner_id':partner_id }) 

        return sc

    @api.model
    @api.returns('self')
    def cancel(self,game_id):
        me = self.env.user
        partner_id = me.parent_id.id
        self = self.sudo()
        game = self.env['og.igame'].browse(game_id)
        #sc = self.env['og.igame.score'].search([('igame_id','=',game_id),
        #                            ('partner_id','=',partner_id)])

        sc = game.score_ids.filtered(lambda s: s.partner_id.id == partner_id)
        if sc:
            sc.unlink()

        return game

    @api.multi
    def register_player(self, player_id,team_id=None):
        for rec in self:
            rec._register_player(player_id,team_id)

    def _register_player(self, player_id, team_id=None):
        if not team_id:
            team_id = self.env.user.parent_id.id
        sc = self.score_ids.filtered(lambda sc: sc.partner_id == team_id)
        player = self.env['res.partner'].browse(player_id)
        sc.player_ids |= player



""" 

    def get_rooms_team(self):
        domain = [('game_type', '=', 'bridge'),
                  ('match_type','=','team'),
                  ('org_type','in',['swiss','circle']) ]
        #uid = self.env.uid
        gm = self.env['og.igame'].sudo().search(domain )
        rounds = gm.mapped('round_ids')
        return rounds.read(['name','round'])



    @api.model
    def get_games_team(self):
        domain = [('game_type', '=', 'bridge'),
                  ('parent_id','=',None),
                  ('match_type', '=', 'team') ]
        fields = ['name', 'org_type', 'score_uom' ]
        gm = self.env['og.igame'].sudo().search(domain)
        return gm.read(fields)

    @api.model
    def get_games_pair(self):
        domain = [('game_type', '=', 'bridge'),
                  ('parent_id','=',None),
                  ('match_type', '=', 'pair') ]
        fields = ['name', 'org_type', 'score_uom' ]
        gm = self.env['og.igame'].search(domain)
        return gm.read(fields)

    @api.model
    def post_games_team(self, name,**kw):
        #kw:  org_type=None, score_uom=None, score_type=None
        if kw.get('score_uom') and kw.get('score_type'):
            del kw['score_type']
        vals = {'name':name, 'game_type':'bridge', 'match_type':'team'}
        vals.update( kw )
        return self.env['og.igame'].create(vals).id

    @api.model
    def post_games_pair(self, name,**kw):
        #kw:  org_type=None, score_uom=None, score_type=None
        if kw.get('score_uom') and kw.get('score_type'):
            del kw['score_type']
        vals = {'name':name, 'game_type':'bridge', 'match_type':'pair'}
        vals.update( kw )
        return self.env['og.igame'].create(vals).id


"""
