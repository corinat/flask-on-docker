from flask_table import Col, LinkCol, Table


class Results(Table):
    classes = ["table", "table-bordered", "table-striped", "table-hover", "table-dark"]
    
    mytable_key = Col('mytable_key', show=False)
    id = Col('id', show=False)
    imei = Col('IMEI')
    name = Col('Name')
    displayname = Col('Display Name')
    gender = Col('Gender')
    categ = Col('Category')
    club = Col('Club')
    bib = Col('BIB')
    age = Col('Age')
    ranking = Col('Rank')
    time_ = Col('Time')

    edit = LinkCol('Edit', 'main.edit', url_kwargs=dict(id='id'))
    delete = LinkCol('Delete', 'main.delete', url_kwargs=dict(id='id'))

