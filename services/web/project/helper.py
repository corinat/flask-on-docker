from project.models import CiucasRoute, Runners, User


class UserHelper:
    def add_dummy_user_data(seed_data):
        """
        Function to add dummy user data into Table
        arg : seed_data which is list of
        user info which we want to add
        """
        users = []
        for data in seed_data:
            user_obj = User(*data)
            users.append(user_obj)
        print("Successfully added users")
        return users

    @staticmethod
    def print_all_users():
        """
        Print all user records from the User table.
        """
        users = User.query.all()
        for user in users:
            first_name = getattr(user, "first_name", user.name if hasattr(user, "name") else "")
            last_name = getattr(user, "last_name", "")
            email = user.email
            print(f"User Name : {first_name} {last_name}, Email : {email}")
        if len(users) == 0:
            print("No User Record Found")

    @staticmethod
    def print_all_runners():
        """
        Print all runner records from the Runners table.
        """
        runners = Runners.query.all()
        for runner in runners:
            print(f"Runner: id={runner.id}, name={runner.name}, bib={runner.bib}, ranking={runner.ranking}")
        if len(runners) == 0:
            print("No Runner Record Found")

    @staticmethod
    def print_all_routes():
        """
        Print all route records from the CiucasRoute table.
        """
        routes = CiucasRoute.query.all()
        for route in routes:
            print(f"Route: distance={route.distance}, ele={route.ele}, xcoord={route.xcoord}, ycoord={route.ycoord}")
        if len(routes) == 0:
            print("No Route Record Found")
