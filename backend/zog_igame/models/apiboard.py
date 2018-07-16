from odoo import api, fields, models

import logging
_logger = logging.getLogger(__name__)


class IntelligentGameBoard(models.Model):
	_inherit='og.board'



#create board for a table,create corresponding match line
#num : board quantity,if needed???
	@api.model
	def create_board(self,table_id,match_id):
		self = self.sudo()
		name = self.env['og.match'].browse(match_id).name
		cs = self.env['og.table'].browse(table_id).deal_ids
		cd = [c for c in cs]
		cd.sort(key=lambda x : x.number)
		num = len(cd)
		if num > len(cd):
			 return 'can not generate it'
		for i in range(num):
			name0 = name + 'board:' + str(i)
			vals = {'table_id':table_id,'deal_id':cd[i].id}
			self.create(vals)
			self._create_match_line(match_id,cd[i].id,name0)
		return True

# create match line for a match,same deal_id with board's
	def _create_match_line(self,match_id,deal_id,name):
		new_name = name
		vals = {'match_id':match_id,'deal_id':deal_id,'name':new_name}
		self.env['og.match.line'].create(vals)






#return the points of a single board
	@api.model
	def board_points(self,board_id):
		board = self.browse(board_id)
		return [board.point,board.ns_point,board.ew_point,board.id]