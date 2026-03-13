<?php
/**
 * PANCANN - Newsletter Subscription Handler
 * 
 * This script handles AJAX POST requests from the newsletter subscription form.
 * It validates the email and sends a notification to the specified recipient.
 */

// Only process POST requests.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the email and remove whitespace.
    $email = filter_var(trim($_POST["email"] ?? ""), FILTER_SANITIZE_EMAIL);
    $form_type = trim($_POST["form_type"] ?? "newsletter"); // Default to newsletter if not specified

    // Check that data was sent to the mailer.
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Set a 400 (bad request) response code and exit.
        http_response_code(400);
        echo "Please enter a valid email address.";
        exit;
    }

    // Set the recipient email address.
    $recipient = "contact@pancanncbd.com";

    // Customize based on form type
    if ($form_type === 'referral') {
        $subject = "New Referral Request - PANCANN";
        $sender_name = "Refer a Friend";
        $intro_text = "A new user wants to get a referral link:";
    } else {
        $subject = "New Newsletter Subscription - PANCANN";
        $sender_name = "Newsletter";
        $intro_text = "A new user has subscribed to the newsletter:";
    }

    // Build the email content (HTML).
    $html_content = "$intro_text<br><br>";
    $html_content .= "<strong>Email:</strong> $email<br>";
    $html_content .= "<strong>Date:</strong> " . date("Y-m-d H:i:s");

    // Resend API Integration
    $api_key = 're_NH2JPZ4d_5f5BrJ4SmxqqRbhY6HnooPh5';
    
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'https://api.resend.com/emails');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        'from' => "$sender_name <contact@pancanncbd.com>", // Use verified domain address
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
        // Set a 200 (okay) response code.
        http_response_code(200);
        if ($form_type === 'referral') {
            echo "Success! Your referral request has been sent.";
        } else {
            echo "Thank you! You have successfully subscribed to our newsletter.";
        }
    } else {
        // Set a 500 (internal server error) response code.
        http_response_code(500);
        echo "Oops! An error occurred while processing your request. Error: " . $result;
    }
} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "There was a problem with your submission. Please try again.";
}

