# forms.py

from wtforms import Form, SelectField, StringField, validators


class RunnerSearchForm(Form):
    choices_class = [('Female(individual)', 'Female(individual)'),
                     ('Mix(team)', 'Mix(team)'),
                     ('Female(team)', 'Female(team)'),
                     ('Male(team)', 'Male(team)'),
                     ('Male(individual)', 'Male(individual)')
                     ]
    select = SelectField('Search for runners:', choices=choices_class)
    search = StringField('')


class RunnerForm(Form):
    runners_types = [('Female(individual)', 'Female(individual)'),
                     ('Mix(team)', 'Mix(team)'),
                     ('Female(team)', 'Female(team)'),
                     ('Male(team)', 'Male(team)'),
                     ('Male(individual)', 'Male(individual)')
                     ]


    select = SelectField('Search for runners:', choices=runners_types)
    search = StringField('')

    choices_gender = [('F', 'F'),
                      ('X', 'X'),
                      ('M', 'M')
                      ]

    id = StringField('id')
    imei = StringField('imei')
    name = StringField('Name')
    displayname = StringField('Display Name')
    gender = SelectField('Gender', choices=choices_gender)
    categ = SelectField('Category', choices=runners_types)
    club = StringField('Club')
    bib = StringField('BIB')
    age = StringField('Age')
    ranking = StringField('Rank')
    time_ = StringField('Time')

