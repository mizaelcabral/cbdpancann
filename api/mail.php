<?php

// Only process POST requests.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields and remove whitespace.
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r", "\n"), array(" ", " "), $name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = trim($_POST["phone"]);
    $message = trim($_POST["message"]);

    // Check that data was sent to the mailer.
    if (empty($name) || empty($message) || empty($phone) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Set a 400 (bad request) response code and exit.
        http_response_code(400);
        echo "Please complete the form and try again.";
        exit;
    }

    // Set the recipient email address.
    $recipient = "contact@pancanncbd.com";

    // Set the email subject.
    $subject = "New contact from your website";

    // Build the email content (HTML).
    $html_content = "<strong>Name:</strong> $name<br>";
    $html_content .= "<strong>Email:</strong> $email<br>";
    $html_content .= "<strong>Phone:</strong> $phone<br><br>";
    $html_content .= "<strong>Message:</strong><br>".nl2br($message);

    // Resend API Integration
    $api_key = 're_NH2JPZ4d_5f5BrJ4SmxqqRbhY6HnooPh5';
    
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'https://api.resend.com/emails');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        'from' => 'Website Contact <contact@pancanncbd.com>', // Use verified domain address
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
        echo "Thank You! Your message has been sent.";
    } else {
        // Set a 500 (internal server error) response code.
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message. Error: " . $result;
    }
} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
