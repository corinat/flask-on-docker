from models import User


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

    def print_all_data():
        """
        Function to print user data available in DB
        """
        user_list = User.print_all_user()
        for user in user_list:
            print(f"User Name : {user.first_name}  {user.last_name}, Address : {user.address}")
        if len(user_list) == 0:
            print("No Record Found")
