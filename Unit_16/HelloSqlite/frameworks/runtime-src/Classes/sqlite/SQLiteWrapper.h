/*
 SQLiteWrapper.h
 
 Copyright (C) 2004 René Nyffenegger
 
 This source code is provided 'as-is', without any express or implied
 warranty. In no event will the author be held liable for any damages
 arising from the use of this software.
 
 Permission is granted to anyone to use this software for any purpose,
 including commercial applications, and to alter it and redistribute it
 freely, subject to the following restrictions:
 
 1. The origin of this source code must not be misrepresented; you must not
 claim that you wrote the original source code. If you use this source code
 in a product, an acknowledgment in the product documentation would be
 appreciated but is not required.
 
 2. Altered source versions must be plainly marked as such, and must not be
 misrepresented as being the original source code.
 
 3. This notice may not be removed or altered from any source distribution.
 
 René Nyffenegger rene.nyffenegger@adp-gmbh.ch
 */

#ifndef SQLITE_WRAPPER_H__
#define SQLITE_WRAPPER_H__

#include <string>
#include <vector>

#include "sqlite3.h"

class SQLiteStatement {
private:
    // SQLiteStatement's ctor only to be called by SQLiteWrapper
    friend class SQLiteWrapper;
    SQLiteStatement(std::string const& statement, sqlite3* db);
    
public:
    SQLiteStatement();
    
    enum DataType {
        INT = SQLITE_INTEGER,
        FLT = SQLITE_FLOAT  ,
        TXT = SQLITE_TEXT   ,
        BLB = SQLITE_BLOB   ,
        NUL = SQLITE_NULL   ,
    };
    
    DataType dataType(int pos_zero_indexed);
    
    int         valueInt   (int pos_zero_indexed);
    std::string valueString(int pos_zero_indexed);
    
    //    SQLiteStatement(const SQLiteStatement&);
    ~SQLiteStatement();
    
    //SQLiteStatement& operator=(SQLiteStatement const&);
    
    bool bind    (int pos_zero_indexed, std::string const& value);
    bool bind    (int pos_zero_indexed, double             value);
    bool bind    (int pos_zero_indexed, int                value);
    bool bindNull(int pos_zero_indexed);
    
    bool execute();
    
    bool nextRow();
    
    /*   Call Reset if not depending on the NextRow cleaning up.
     For example for select count(*) statements*/
    bool reset();
    
    bool restartSelect();
    
private:
    //void DecreaseRefCounter();
    
    //int* ref_counter_; // not yet used...
    sqlite3_stmt* stmt_;
};

class SQLiteWrapper {
public:
    SQLiteWrapper();
    std::string initializing(const std::string &db_file,const std::string &searchPath,const std::string &searchResolution);
    bool open(std::string const& db_file);
    
    bool directStatement      (std::string const& stmt);
    SQLiteStatement* statement(std::string const& stmt);
    
    std::string lastError();
    
    // Transaction related
    bool begin   ();
    bool commit  ();
    bool rollback();
    
private:
    
    static int selectCallback(void *p_data, int num_fields, char **p_fields, char **p_col_names);
    
    sqlite3* db_;
};

#endif