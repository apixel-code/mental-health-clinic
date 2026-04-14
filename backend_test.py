#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class PsychiatristWebsiteAPITester:
    def __init__(self, base_url="https://wellness-journey-230.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.created_blog_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if method == 'GET' and isinstance(response_data, list):
                        print(f"   Response: {len(response_data)} items returned")
                    elif method == 'POST' and 'id' in response_data:
                        print(f"   Created ID: {response_data['id']}")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Error: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "", 200)

    def test_admin_verify_success(self):
        """Test admin verification with correct password"""
        return self.run_test(
            "Admin Verify (Success)",
            "POST",
            "admin/verify",
            200,
            data={"password": "admin123"}
        )

    def test_admin_verify_failure(self):
        """Test admin verification with wrong password"""
        return self.run_test(
            "Admin Verify (Failure)",
            "POST",
            "admin/verify",
            401,
            data={"password": "wrongpassword"}
        )

    def test_get_blogs_empty(self):
        """Test getting blogs when database is empty"""
        success, response = self.run_test("Get All Blogs", "GET", "blogs", 200)
        return success

    def test_create_blog(self):
        """Test creating a new blog post"""
        blog_data = {
            "title": "মানসিক স্বাস্থ্য নিয়ে প্রাথমিক ধারণা",
            "excerpt": "মানসিক স্বাস্থ্য সম্পর্কে জানা প্রয়োজনীয় তথ্য",
            "content": "<p>মানসিক স্বাস্থ্য আমাদের সামগ্রিক সুস্থতার একটি গুরুত্বপূর্ণ অংশ। এটি আমাদের চিন্তা, অনুভূতি এবং আচরণকে প্রভাবিত করে।</p><p>সুস্থ মানসিক অবস্থা বজায় রাখার জন্য নিয়মিত ব্যায়াম, পর্যাপ্ত ঘুম এবং সুষম খাবার গ্রহণ করা প্রয়োজন।</p>",
            "category": "সাধারণ তথ্য",
            "thumbnail": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGh8ZW58MHx8fHwxNzc2MTk2MDcxfDA&ixlib=rb-4.1.0&q=85",
            "published": True
        }
        success, response = self.run_test("Create Blog", "POST", "blogs", 200, data=blog_data)
        if success and 'id' in response:
            self.created_blog_id = response['id']
        return success

    def test_get_blogs_with_data(self):
        """Test getting blogs after creating one"""
        success, response = self.run_test("Get All Blogs (With Data)", "GET", "blogs", 200)
        if success and isinstance(response, list) and len(response) > 0:
            print(f"   Found {len(response)} blog(s)")
            return True
        return False

    def test_get_single_blog(self):
        """Test getting a single blog by ID"""
        if not self.created_blog_id:
            print("❌ Skipped - No blog ID available")
            return False
        
        return self.run_test(
            "Get Single Blog",
            "GET",
            f"blogs/{self.created_blog_id}",
            200
        )[0]

    def test_update_blog(self):
        """Test updating a blog post"""
        if not self.created_blog_id:
            print("❌ Skipped - No blog ID available")
            return False
        
        update_data = {
            "title": "মানসিক স্বাস্থ্য নিয়ে প্রাথমিক ধারণা (আপডেটেড)",
            "excerpt": "আপডেটেড সারাংশ"
        }
        return self.run_test(
            "Update Blog",
            "PUT",
            f"blogs/{self.created_blog_id}",
            200,
            data=update_data
        )[0]

    def test_get_published_blogs_only(self):
        """Test getting only published blogs"""
        return self.run_test("Get Published Blogs Only", "GET", "blogs?published_only=true", 200)[0]

    def test_get_nonexistent_blog(self):
        """Test getting a blog that doesn't exist"""
        return self.run_test(
            "Get Non-existent Blog",
            "GET",
            "blogs/nonexistent-id",
            404
        )[0]

    def test_delete_blog(self):
        """Test deleting a blog post"""
        if not self.created_blog_id:
            print("❌ Skipped - No blog ID available")
            return False
        
        return self.run_test(
            "Delete Blog",
            "DELETE",
            f"blogs/{self.created_blog_id}",
            200
        )[0]

def main():
    print("🚀 Starting Psychiatrist Website API Tests")
    print("=" * 50)
    
    tester = PsychiatristWebsiteAPITester()
    
    # Test sequence
    tests = [
        ("Root API Endpoint", tester.test_root_endpoint),
        ("Admin Verify Success", tester.test_admin_verify_success),
        ("Admin Verify Failure", tester.test_admin_verify_failure),
        ("Get Blogs (Empty)", tester.test_get_blogs_empty),
        ("Create Blog", tester.test_create_blog),
        ("Get Blogs (With Data)", tester.test_get_blogs_with_data),
        ("Get Single Blog", tester.test_get_single_blog),
        ("Update Blog", tester.test_update_blog),
        ("Get Published Blogs Only", tester.test_get_published_blogs_only),
        ("Get Non-existent Blog", tester.test_get_nonexistent_blog),
        ("Delete Blog", tester.test_delete_blog),
    ]
    
    for test_name, test_func in tests:
        try:
            test_func()
        except Exception as e:
            print(f"❌ {test_name} - Exception: {str(e)}")
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())