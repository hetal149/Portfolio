#!/usr/bin/env python3
"""
Backend API Testing for Hetal Patil Portfolio
Tests all backend endpoints using the external URL from frontend/.env
"""

import requests
import json
import uuid
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get the backend URL from frontend environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL')
if not BACKEND_URL:
    print("❌ ERROR: REACT_APP_BACKEND_URL not found in frontend/.env")
    exit(1)

API_BASE = f"{BACKEND_URL}/api"
print(f"🔗 Testing API at: {API_BASE}")

def test_root_endpoint():
    """Test GET /api/ endpoint"""
    print("\n🧪 Testing GET /api/ ...")
    try:
        response = requests.get(f"{API_BASE}/")
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "ok" and "message" in data:
                print("   ✅ Root endpoint working correctly")
                return True
            else:
                print("   ❌ Root endpoint response format incorrect")
                return False
        else:
            print(f"   ❌ Root endpoint failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"   ❌ Root endpoint error: {e}")
        return False

def test_health_endpoint():
    """Test GET /api/health endpoint"""
    print("\n🧪 Testing GET /api/health ...")
    try:
        response = requests.get(f"{API_BASE}/health")
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            expected_keys = ["status", "resend_configured", "to_email"]
            if all(key in data for key in expected_keys):
                if data["status"] == "healthy" and data["to_email"] == "hetalpatil149@gmail.com":
                    print("   ✅ Health endpoint working correctly")
                    print(f"   📧 Resend configured: {data['resend_configured']}")
                    return True
                else:
                    print("   ❌ Health endpoint data incorrect")
                    return False
            else:
                print("   ❌ Health endpoint missing required fields")
                return False
        else:
            print(f"   ❌ Health endpoint failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"   ❌ Health endpoint error: {e}")
        return False

def test_contact_endpoint_valid():
    """Test POST /api/contact with valid payload"""
    print("\n🧪 Testing POST /api/contact with valid data ...")
    
    payload = {
        "name": "Test User",
        "email": "test@example.com", 
        "subject": "Testing backend",
        "message": "This is an automated test message for the contact endpoint."
    }
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=payload)
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["success", "id", "email_sent"]
            if all(field in data for field in required_fields):
                if data["success"] and data["email_sent"]:
                    print("   ✅ Contact endpoint working correctly")
                    print(f"   📧 Email sent successfully via Resend")
                    print(f"   🆔 Message ID: {data['id']}")
                    return True, data["id"]
                else:
                    print("   ❌ Contact endpoint success/email_sent flags incorrect")
                    return False, None
            else:
                print("   ❌ Contact endpoint missing required response fields")
                return False, None
        else:
            print(f"   ❌ Contact endpoint failed with status {response.status_code}")
            return False, None
    except Exception as e:
        print(f"   ❌ Contact endpoint error: {e}")
        return False, None

def test_contact_validation():
    """Test POST /api/contact validation errors"""
    print("\n🧪 Testing POST /api/contact validation ...")
    
    test_cases = [
        {
            "name": "Missing email",
            "payload": {"name": "Test", "message": "This is a test message"},
            "expected_status": 422
        },
        {
            "name": "Invalid email format", 
            "payload": {"name": "Test", "email": "invalid-email", "message": "This is a test message"},
            "expected_status": 422
        },
        {
            "name": "Message too short",
            "payload": {"name": "Test", "email": "test@example.com", "message": "Short"},
            "expected_status": 422
        },
        {
            "name": "Name too short",
            "payload": {"name": "T", "email": "test@example.com", "message": "This is a test message"},
            "expected_status": 422
        }
    ]
    
    all_passed = True
    for test_case in test_cases:
        print(f"\n   Testing: {test_case['name']}")
        try:
            response = requests.post(f"{API_BASE}/contact", json=test_case["payload"])
            print(f"   Status: {response.status_code}")
            
            if response.status_code == test_case["expected_status"]:
                print(f"   ✅ Validation working for {test_case['name']}")
            else:
                print(f"   ❌ Expected {test_case['expected_status']}, got {response.status_code}")
                all_passed = False
        except Exception as e:
            print(f"   ❌ Error testing {test_case['name']}: {e}")
            all_passed = False
    
    return all_passed

def test_contact_messages_endpoint(test_message_id=None):
    """Test GET /api/contact/messages endpoint"""
    print("\n🧪 Testing GET /api/contact/messages ...")
    try:
        response = requests.get(f"{API_BASE}/contact/messages")
        print(f"   Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   Response structure: count={data.get('count')}, items_length={len(data.get('items', []))}")
            
            if "count" in data and "items" in data:
                print("   ✅ Messages endpoint structure correct")
                
                # Check if our test message appears
                if test_message_id:
                    found_test_message = False
                    for item in data.get("items", []):
                        if item.get("id") == test_message_id:
                            found_test_message = True
                            print(f"   ✅ Test message found in database: {item.get('name')} - {item.get('email')}")
                            break
                    
                    if not found_test_message:
                        print(f"   ⚠️  Test message with ID {test_message_id} not found in results")
                
                return True
            else:
                print("   ❌ Messages endpoint missing required fields")
                return False
        else:
            print(f"   ❌ Messages endpoint failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"   ❌ Messages endpoint error: {e}")
        return False

def main():
    """Run all backend tests"""
    print("🚀 Starting Backend API Tests for Hetal Patil Portfolio")
    print("=" * 60)
    
    results = {}
    test_message_id = None
    
    # Test 1: Root endpoint
    results["root"] = test_root_endpoint()
    
    # Test 2: Health endpoint  
    results["health"] = test_health_endpoint()
    
    # Test 3: Contact endpoint with valid data
    contact_success, message_id = test_contact_endpoint_valid()
    results["contact_valid"] = contact_success
    if message_id:
        test_message_id = message_id
    
    # Test 4: Contact validation
    results["contact_validation"] = test_contact_validation()
    
    # Test 5: Messages endpoint
    results["messages"] = test_contact_messages_endpoint(test_message_id)
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    
    passed = sum(1 for result in results.values() if result)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name:20} {status}")
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All backend tests PASSED!")
        return True
    else:
        print("⚠️  Some backend tests FAILED!")
        return False

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)