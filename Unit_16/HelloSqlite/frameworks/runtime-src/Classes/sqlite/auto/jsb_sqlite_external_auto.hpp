#include "base/ccConfig.h"
#ifndef __sqlite_external_h__
#define __sqlite_external_h__

#include "jsapi.h"
#include "jsfriendapi.h"

extern JSClass  *jsb_SQLiteStatement_class;
extern JSObject *jsb_SQLiteStatement_prototype;

bool js_sqlite_external_SQLiteStatement_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_sqlite_external_SQLiteStatement_finalize(JSContext *cx, JSObject *obj);
void js_register_sqlite_external_SQLiteStatement(JSContext *cx, JS::HandleObject global);
void register_all_sqlite_external(JSContext* cx, JS::HandleObject obj);
bool js_sqlite_external_SQLiteStatement_reset(JSContext *cx, uint32_t argc, jsval *vp);
bool js_sqlite_external_SQLiteStatement_execute(JSContext *cx, uint32_t argc, jsval *vp);
bool js_sqlite_external_SQLiteStatement_dataType(JSContext *cx, uint32_t argc, jsval *vp);
bool js_sqlite_external_SQLiteStatement_bind(JSContext *cx, uint32_t argc, jsval *vp);
bool js_sqlite_external_SQLiteStatement_nextRow(JSContext *cx, uint32_t argc, jsval *vp);
bool js_sqlite_external_SQLiteStatement_restartSelect(JSContext *cx, uint32_t argc, jsval *vp);
bool js_sqlite_external_SQLiteStatement_bindNull(JSContext *cx, uint32_t argc, jsval *vp);
bool js_sqlite_external_SQLiteStatement_valueInt(JSContext *cx, uint32_t argc, jsval *vp);
bool js_sqlite_external_SQLiteStatement_valueString(JSContext *cx, uint32_t argc, jsval *vp);
bool js_sqlite_external_SQLiteStatement_SQLiteStatement(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_SQLiteWrapper_class;
extern JSObject *jsb_SQLiteWrapper_prototype;

bool js_sqlite_external_SQLiteWrapper_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_sqlite_external_SQLiteWrapper_finalize(JSContext *cx, JSObject *obj);
void js_register_sqlite_external_SQLiteWrapper(JSContext *cx, JS::HandleObject global);
void register_all_sqlite_external(JSContext* cx, JS::HandleObject obj);
bool js_sqlite_external_SQLiteWrapper_begin(JSContext *cx, uint32_t argc, jsval *vp);
bool js_sqlite_external_SQLiteWrapper_rollback(JSContext *cx, uint32_t argc, jsval *vp);
bool js_sqlite_external_SQLiteWrapper_directStatement(JSContext *cx, uint32_t argc, jsval *vp);
bool js_sqlite_external_SQLiteWrapper_statement(JSContext *cx, uint32_t argc, jsval *vp);
bool js_sqlite_external_SQLiteWrapper_initializing(JSContext *cx, uint32_t argc, jsval *vp);
bool js_sqlite_external_SQLiteWrapper_commit(JSContext *cx, uint32_t argc, jsval *vp);
bool js_sqlite_external_SQLiteWrapper_lastError(JSContext *cx, uint32_t argc, jsval *vp);
bool js_sqlite_external_SQLiteWrapper_open(JSContext *cx, uint32_t argc, jsval *vp);
bool js_sqlite_external_SQLiteWrapper_SQLiteWrapper(JSContext *cx, uint32_t argc, jsval *vp);

#endif // __sqlite_external_h__
