import os
import sys

from flask import Flask
# from flask_mysql_connector import MySQL, Params
import mysql.connector
from mysql.connector import errorcode, Error
import yaml

database_init = Flask(__name__)


# cur.fetchone()
# cur.fetchmany(size=10)
# cur.fetchall()

class Database(): 

    def db_connection(self):
        db = yaml.load(open('../db.yaml'), Loader=yaml.FullLoader)
        try:
            cnx = mysql.connector.connect(
                host = db['mysql_host'],
                database = db['mysql_db'],
                user = db['mysql_user'],
                password = db['mysql_password']
            )
            print('Database CONNECTED')
            return cnx
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password")
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist")
            else:
                print(err)
            return err.errno
        # else:
        #     cnx.close()

    # Still in testing
    def selectAllFromDatabase(self, query): 
        cnx = self.db_connection()
        cur = cnx.cursor()
        response = None
        try:
            cur.execute(query)
            output = cur.fetchall()
            print(' OUTPUT SELECT ALL {}'.format(output))
            for row in output:
                response.push(row)
            message = 'DATA RETRIEVED SUCCESSFULLY'

        except Error as error:
            message = 'ERROR GETTING DATA FROM DATABASE'
            response = error
        finally:
            cur.close()
            cnx.close()

        return (response, message)

    def selectOneFromDatabase(self, query):
        cnx = self.db_connection()
        cur = cnx.cursor()
        response = None
        try:
            cur.execute(query)
            output = cur.fetchone()
            while output is not None:
                response = output
                output = cur.fetchone()
            message = 'DATA RETRIEVED SUCCESSFULLY'
            
        except Error as error:
            message = 'ERROR GETTING DATA FROM DATABASE'
            response = error

        finally:
            cur.close()
            cnx.close()

        return (response, message)

    def inputToDatabase(self, query, data):
        cnx = self.db_connection()
        cur = cnx.cursor()

        try:
            cur.execute(query, data)
            message = 'DATA UPDATED SUCCESSFULLY'
            cnx.commit()    

        except:
            message = 'ERROR PUTTING DATA INTO DATABASE'

        finally:
            cur.close()
            cnx.close()
            
        return message

        
        

if __name__ == '__main__':
    database_init.run(debug=True)