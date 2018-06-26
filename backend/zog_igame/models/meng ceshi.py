# -*- coding: utf-8 -*-
# from odoo import api, fields, models
#
# class AModel(models.Model):
#     _name = 'a.model'
#     def a_method(self):
#         # self can be anywhere between 0 records and all records in the
#         # database
#         self.do_operation()
#
#
# AModel()

records = {}
# for record in records:
#     record.a = 1
#     record.b = 2
#     record.c = 3

# len(records) database updates
for record in records:
    record.write({'a': 1, 'b': 2, 'c': 3})

print records



# 1 database update
# records.write({'a': 1, 'b': 2, 'c': 3})
print records


# def do_operation(self):
#     print self # => a.model(1, 2, 3, 4, 5)
#     for record in self:
#         print record
#
# do_operation({1, 2, 3, 4, 5})