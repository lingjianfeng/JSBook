#include "auto_person_binding.hpp"
#include "cocos2d_specifics.hpp"
#include "Person.h"

template<class T>
static bool dummy_constructor(JSContext *cx, uint32_t argc, jsval *vp) {
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedValue initializing(cx);
    bool isNewValid = true;
    if (isNewValid)
    {
        TypeTest<T> t;
        js_type_class_t *typeClass = nullptr;
        std::string typeName = t.s_name();
        auto typeMapIter = _js_global_type_map.find(typeName);
        CCASSERT(typeMapIter != _js_global_type_map.end(), "Can't find the class type!");
        typeClass = typeMapIter->second;
        CCASSERT(typeClass, "The value is null.");

        JS::RootedObject proto(cx, typeClass->proto.get());
        JS::RootedObject parent(cx, typeClass->parentProto.get());
        JS::RootedObject _tmp(cx, JS_NewObject(cx, typeClass->jsclass, proto, parent));
        
        T* cobj = new T();
        js_proxy_t *pp = jsb_new_proxy(cobj, _tmp);
        AddObjectRoot(cx, &pp->obj);
        args.rval().set(OBJECT_TO_JSVAL(_tmp));
        return true;
    }

    return false;
}

static bool empty_constructor(JSContext *cx, uint32_t argc, jsval *vp) {
    return false;
}

static bool js_is_native_obj(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    args.rval().setBoolean(true);
    return true;    
}
JSClass  *jsb_Person_class;
JSObject *jsb_Person_prototype;

bool js_auto_person_binding_Person_setHeight(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    Person* cobj = (Person *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_auto_person_binding_Person_setHeight : Invalid Native Object");
    if (argc == 1) {
        double arg0;
        ok &= JS::ToNumber( cx, args.get(0), &arg0) && !isnan(arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_auto_person_binding_Person_setHeight : Error processing arguments");
        cobj->setHeight(arg0);
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_auto_person_binding_Person_setHeight : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
bool js_auto_person_binding_Person_onGreetings(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    Person* cobj = (Person *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_auto_person_binding_Person_onGreetings : Invalid Native Object");
    if (argc == 0) {
        cobj->onGreetings();
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_auto_person_binding_Person_onGreetings : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_auto_person_binding_Person_getAge(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    Person* cobj = (Person *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_auto_person_binding_Person_getAge : Invalid Native Object");
    if (argc == 0) {
        int ret = cobj->getAge();
        jsval jsret = JSVAL_NULL;
        jsret = int32_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }

    JS_ReportError(cx, "js_auto_person_binding_Person_getAge : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_auto_person_binding_Person_setName(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    Person* cobj = (Person *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_auto_person_binding_Person_setName : Invalid Native Object");
    if (argc == 1) {
        std::string arg0;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_auto_person_binding_Person_setName : Error processing arguments");
        cobj->setName(arg0);
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_auto_person_binding_Person_setName : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
bool js_auto_person_binding_Person_getName(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    Person* cobj = (Person *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_auto_person_binding_Person_getName : Invalid Native Object");
    if (argc == 0) {
        std::string ret = cobj->getName();
        jsval jsret = JSVAL_NULL;
        jsret = std_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }

    JS_ReportError(cx, "js_auto_person_binding_Person_getName : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_auto_person_binding_Person_getHeight(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    Person* cobj = (Person *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_auto_person_binding_Person_getHeight : Invalid Native Object");
    if (argc == 0) {
        double ret = cobj->getHeight();
        jsval jsret = JSVAL_NULL;
        jsret = DOUBLE_TO_JSVAL(ret);
        args.rval().set(jsret);
        return true;
    }

    JS_ReportError(cx, "js_auto_person_binding_Person_getHeight : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_auto_person_binding_Person_setAge(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    Person* cobj = (Person *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_auto_person_binding_Person_setAge : Invalid Native Object");
    if (argc == 1) {
        int arg0;
        ok &= jsval_to_int32(cx, args.get(0), (int32_t *)&arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_auto_person_binding_Person_setAge : Error processing arguments");
        cobj->setAge(arg0);
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_auto_person_binding_Person_setAge : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
bool js_auto_person_binding_Person_onSpeakWithContent(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    Person* cobj = (Person *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_auto_person_binding_Person_onSpeakWithContent : Invalid Native Object");
    if (argc == 1) {
        std::string arg0;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_auto_person_binding_Person_onSpeakWithContent : Error processing arguments");
        cobj->onSpeakWithContent(arg0);
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_auto_person_binding_Person_onSpeakWithContent : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
bool js_auto_person_binding_Person_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;

    JS::RootedObject obj(cx);
    Person* cobj = NULL;
    do {
        if (argc == 1) {
            std::string arg0;
            ok &= jsval_to_std_string(cx, args.get(0), &arg0);
            if (!ok) { ok = true; break; }
            cobj = new (std::nothrow) Person(arg0);
            TypeTest<Person> t;
            js_type_class_t *typeClass = nullptr;
            std::string typeName = t.s_name();
            auto typeMapIter = _js_global_type_map.find(typeName);
            CCASSERT(typeMapIter != _js_global_type_map.end(), "Can't find the class type!");
            typeClass = typeMapIter->second;
            CCASSERT(typeClass, "The value is null.");
            // obj = JS_NewObject(cx, typeClass->jsclass, typeClass->proto, typeClass->parentProto);
            JS::RootedObject proto(cx, typeClass->proto.get());
            JS::RootedObject parent(cx, typeClass->parentProto.get());
            obj = JS_NewObject(cx, typeClass->jsclass, proto, parent);

            js_proxy_t* p = jsb_new_proxy(cobj, obj);
        }
    } while(0);

    do {
        if (argc == 0) {
            cobj = new (std::nothrow) Person();
            TypeTest<Person> t;
            js_type_class_t *typeClass = nullptr;
            std::string typeName = t.s_name();
            auto typeMapIter = _js_global_type_map.find(typeName);
            CCASSERT(typeMapIter != _js_global_type_map.end(), "Can't find the class type!");
            typeClass = typeMapIter->second;
            CCASSERT(typeClass, "The value is null.");
            // obj = JS_NewObject(cx, typeClass->jsclass, typeClass->proto, typeClass->parentProto);
            JS::RootedObject proto(cx, typeClass->proto.get());
            JS::RootedObject parent(cx, typeClass->parentProto.get());
            obj = JS_NewObject(cx, typeClass->jsclass, proto, parent);

            js_proxy_t* p = jsb_new_proxy(cobj, obj);
        }
    } while(0);

    do {
        if (argc == 2) {
            std::string arg0;
            ok &= jsval_to_std_string(cx, args.get(0), &arg0);
            if (!ok) { ok = true; break; }
            int arg1;
            ok &= jsval_to_int32(cx, args.get(1), (int32_t *)&arg1);
            if (!ok) { ok = true; break; }
            cobj = new (std::nothrow) Person(arg0, arg1);
            TypeTest<Person> t;
            js_type_class_t *typeClass = nullptr;
            std::string typeName = t.s_name();
            auto typeMapIter = _js_global_type_map.find(typeName);
            CCASSERT(typeMapIter != _js_global_type_map.end(), "Can't find the class type!");
            typeClass = typeMapIter->second;
            CCASSERT(typeClass, "The value is null.");
            // obj = JS_NewObject(cx, typeClass->jsclass, typeClass->proto, typeClass->parentProto);
            JS::RootedObject proto(cx, typeClass->proto.get());
            JS::RootedObject parent(cx, typeClass->parentProto.get());
            obj = JS_NewObject(cx, typeClass->jsclass, proto, parent);

            js_proxy_t* p = jsb_new_proxy(cobj, obj);
        }
    } while(0);

    do {
        if (argc == 3) {
            std::string arg0;
            ok &= jsval_to_std_string(cx, args.get(0), &arg0);
            if (!ok) { ok = true; break; }
            int arg1;
            ok &= jsval_to_int32(cx, args.get(1), (int32_t *)&arg1);
            if (!ok) { ok = true; break; }
            double arg2;
            ok &= JS::ToNumber( cx, args.get(2), &arg2) && !isnan(arg2);
            if (!ok) { ok = true; break; }
            cobj = new (std::nothrow) Person(arg0, arg1, arg2);
            TypeTest<Person> t;
            js_type_class_t *typeClass = nullptr;
            std::string typeName = t.s_name();
            auto typeMapIter = _js_global_type_map.find(typeName);
            CCASSERT(typeMapIter != _js_global_type_map.end(), "Can't find the class type!");
            typeClass = typeMapIter->second;
            CCASSERT(typeClass, "The value is null.");
            // obj = JS_NewObject(cx, typeClass->jsclass, typeClass->proto, typeClass->parentProto);
            JS::RootedObject proto(cx, typeClass->proto.get());
            JS::RootedObject parent(cx, typeClass->parentProto.get());
            obj = JS_NewObject(cx, typeClass->jsclass, proto, parent);

            js_proxy_t* p = jsb_new_proxy(cobj, obj);
        }
    } while(0);

    if (cobj) {
        if (JS_HasProperty(cx, obj, "_ctor", &ok) && ok)
                ScriptingCore::getInstance()->executeFunctionWithOwner(OBJECT_TO_JSVAL(obj), "_ctor", args);

        args.rval().set(OBJECT_TO_JSVAL(obj));
        return true;
    }
    JS_ReportError(cx, "js_auto_person_binding_Person_constructor : wrong number of arguments");
    return false;
}


void js_Person_finalize(JSFreeOp *fop, JSObject *obj) {
    CCLOGINFO("jsbindings: finalizing JS object %p (Person)", obj);
    js_proxy_t* nproxy;
    js_proxy_t* jsproxy;
    jsproxy = jsb_get_js_proxy(obj);
    if (jsproxy) {
        nproxy = jsb_get_native_proxy(jsproxy->ptr);

        Person *nobj = static_cast<Person *>(nproxy->ptr);
        if (nobj)
            delete nobj;
        
        jsb_remove_proxy(nproxy, jsproxy);
    }
}
void js_register_auto_person_binding_Person(JSContext *cx, JS::HandleObject global) {
    jsb_Person_class = (JSClass *)calloc(1, sizeof(JSClass));
    jsb_Person_class->name = "Person";
    jsb_Person_class->addProperty = JS_PropertyStub;
    jsb_Person_class->delProperty = JS_DeletePropertyStub;
    jsb_Person_class->getProperty = JS_PropertyStub;
    jsb_Person_class->setProperty = JS_StrictPropertyStub;
    jsb_Person_class->enumerate = JS_EnumerateStub;
    jsb_Person_class->resolve = JS_ResolveStub;
    jsb_Person_class->convert = JS_ConvertStub;
    jsb_Person_class->finalize = js_Person_finalize;
    jsb_Person_class->flags = JSCLASS_HAS_RESERVED_SLOTS(2);

    static JSPropertySpec properties[] = {
        JS_PSG("__nativeObj", js_is_native_obj, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_PS_END
    };

    static JSFunctionSpec funcs[] = {
        JS_FN("setHeight", js_auto_person_binding_Person_setHeight, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("onGreetings", js_auto_person_binding_Person_onGreetings, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("getAge", js_auto_person_binding_Person_getAge, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("setName", js_auto_person_binding_Person_setName, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("getName", js_auto_person_binding_Person_getName, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("getHeight", js_auto_person_binding_Person_getHeight, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("setAge", js_auto_person_binding_Person_setAge, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("onSpeakWithContent", js_auto_person_binding_Person_onSpeakWithContent, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };

    JSFunctionSpec *st_funcs = NULL;

    jsb_Person_prototype = JS_InitClass(
        cx, global,
        JS::NullPtr(), // parent proto
        jsb_Person_class,
        js_auto_person_binding_Person_constructor, 0, // constructor
        properties,
        funcs,
        NULL, // no static properties
        st_funcs);
    // make the class enumerable in the registered namespace
//  bool found;
//FIXME: Removed in Firefox v27 
//  JS_SetPropertyAttributes(cx, global, "Person", JSPROP_ENUMERATE | JSPROP_READONLY, &found);

    // add the proto and JSClass to the type->js info hash table
    TypeTest<Person> t;
    js_type_class_t *p;
    std::string typeName = t.s_name();
    if (_js_global_type_map.find(typeName) == _js_global_type_map.end())
    {
        p = (js_type_class_t *)malloc(sizeof(js_type_class_t));
        p->jsclass = jsb_Person_class;
        p->proto = jsb_Person_prototype;
        p->parentProto = NULL;
        _js_global_type_map.insert(std::make_pair(typeName, p));
    }
}

void register_all_auto_person_binding(JSContext* cx, JS::HandleObject obj) {
    // Get the ns
    JS::RootedObject ns(cx);
    get_or_create_js_obj(cx, obj, "jf", &ns);

    js_register_auto_person_binding_Person(cx, ns);
}

