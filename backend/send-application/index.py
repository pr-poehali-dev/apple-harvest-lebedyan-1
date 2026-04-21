"""Отправка заявки сборщика: сохраняет данные и отправляет SMS на номер владельца."""
import json
import os
import urllib.request
import urllib.parse


OWNER_PHONE = "79399130210"


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    point = body.get("point", "не указан")
    schedule = body.get("amount", "не указан")
    comment = body.get("comment", "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Имя и телефон обязательны"}, ensure_ascii=False),
        }

    sms_text = (
        f"Новый сборщик!\n"
        f"Имя: {name}\n"
        f"Тел: {phone}\n"
        f"Сад: {point}\n"
        f"График: {schedule}"
    )
    if comment:
        sms_text += f"\nКомментарий: {comment}"

    api_key = os.environ.get("SMSRU_API_KEY", "")
    sms_sent = False

    if api_key:
        params = urllib.parse.urlencode({
            "api_id": api_key,
            "to": OWNER_PHONE,
            "msg": sms_text,
            "json": 1,
        })
        req = urllib.request.Request(
            f"https://sms.ru/sms/send?{params}",
            method="GET",
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            result = json.loads(resp.read().decode())
            sms_sent = result.get("status") == "OK"

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"success": True, "sms_sent": sms_sent}, ensure_ascii=False),
    }
