"""
Form definitions for runner search and runner data entry using WTForms.

Provides RunnerSearchForm for searching runners and RunnerForm for creating/editing runner records.
"""

from wtforms import Form, SelectField, StringField


class RunnerSearchForm(Form):
    """
    WTForms form for searching runners by name and category.
    """

    choices_class = [
        ("Female(individual)", "Female(individual)"),
        ("Mix(team)", "Mix(team)"),
        ("Female(team)", "Female(team)"),
        ("Male(team)", "Male(team)"),
        ("Male(individual)", "Male(individual)"),
    ]
    select = SelectField("Search for runners:", choices=choices_class)
    search = StringField("")


class RunnerForm(Form):
    """
    WTForms form for creating or editing runner records, including all runner fields.
    """

    runners_types = [
        ("Female(individual)", "Female(individual)"),
        ("Mix(team)", "Mix(team)"),
        ("Female(team)", "Female(team)"),
        ("Male(team)", "Male(team)"),
        ("Male(individual)", "Male(individual)"),
    ]

    select = SelectField("Search for runners:", choices=runners_types)
    search = StringField("")

    choices_gender = [("F", "F"), ("X", "X"), ("M", "M")]

    id = StringField("id")
    imei = StringField("imei")
    name = StringField("Name")
    displayname = StringField("Display Name")
    gender = SelectField("Gender", choices=choices_gender)
    categ = SelectField("Category", choices=runners_types)
    club = StringField("Club")
    bib = StringField("BIB")
    age = StringField("Age")
    ranking = StringField("Rank")
    time_ = StringField("Time")
