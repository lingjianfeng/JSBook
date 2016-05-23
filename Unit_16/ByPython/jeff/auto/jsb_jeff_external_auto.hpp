#include "base/ccConfig.h"
#ifndef __user_external_h__
#define __user_external_h__

#include "jsapi.h"
#include "jsfriendapi.h"

extern JSClass  *jsb_Person_class;
extern JSObject *jsb_Person_prototype;

bool js_user_external_Person_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_user_external_Person_finalize(JSContext *cx, JSObject *obj);
void js_register_user_external_Person(JSContext *cx, JS::HandleObject global);
void register_all_user_external(JSContext* cx, JS::HandleObject obj);
bool js_user_external_Person_setHeight(JSContext *cx, uint32_t argc, jsval *vp);
bool js_user_external_Person_onGreetings(JSContext *cx, uint32_t argc, jsval *vp);
bool js_user_external_Person_getAge(JSContext *cx, uint32_t argc, jsval *vp);
bool js_user_external_Person_setName(JSContext *cx, uint32_t argc, jsval *vp);
bool js_user_external_Person_getName(JSContext *cx, uint32_t argc, jsval *vp);
bool js_user_external_Person_getHeight(JSContext *cx, uint32_t argc, jsval *vp);
bool js_user_external_Person_setAge(JSContext *cx, uint32_t argc, jsval *vp);
bool js_user_external_Person_onSpeakWithContent(JSContext *cx, uint32_t argc, jsval *vp);
bool js_user_external_Person_Person(JSContext *cx, uint32_t argc, jsval *vp);

#endif // __user_external_h__
