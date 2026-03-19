<?php
/**
 * PANCANN - Product Review Handler
 * 
 * This script handles AJAX POST requests from the product review form.
 * It sends a notification email to contact@pancanncbd.com using Resend API.
 */

// Only process POST requests.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get and sanitize form data.
    $name = strip_tags(trim($_POST["name"] ?? ""));
    $email = filter_var(trim($_POST["email"] ?? ""), FILTER_SANITIZE_EMAIL);
    $rating = trim($_POST["rating"] ?? "0");
    $message = strip_tags(trim($_POST["message"] ?? ""));
    $product = trim($_POST["product"] ?? "Pancann Isolate CBD Oil 1750mg");

    // Validate essential fields.
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please complete all fields and provide a valid email address.";
        exit;
    }

    // Set the recipient email address.
    $recipient = "contact@pancanncbd.com";
    $subject = "New Product Review - $product";
    
    // Build the email content (HTML).
    $html_content = "<h2>New Product Review Received</h2>";
    $html_content .= "<p><strong>Product:</strong> $product</p>";
    $html_content .= "<p><strong>Reviewer:</strong> $name ($email)</p>";
    $html_content .= "<p><strong>Rating:</strong> $rating / 5 stars</p>";
    $html_content .= "<p><strong>Review message:</strong><br>$message</p>";
    $html_content .= "<p><strong>Submitted on:</strong> " . date("Y-m-d H:i:s") . "</p>";

    // Resend API Integration
    $api_key = 're_NH2JPZ4d_5f5BrJ4SmxqqRbhY6HnooPh5';
    
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'https://api.resend.com/emails');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        'from' => "Product Reviews <contact@pancanncbd.com>",
        'to' => [$recipient],
        'subject' => $subject,
        'html' => $html_content,
        'reply_to' => $email
    ]));

    $headers = [
        'Authorization: Bearer ' . $api_key,
        'Content-Type: application/json'
    ];
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http_code == 200 || $http_code == 201) {
        http_response_code(200);
        echo "Thank you! Your review has been submitted for approval.";
    } else {
        http_response_code(500);
        echo "Oops! An error occurred while processing your request. Please try again later.";
    }
} else {
    // Not a POST request.
    http_response_code(403);
    echo "There was a problem with your submission. Please try again.";
}
