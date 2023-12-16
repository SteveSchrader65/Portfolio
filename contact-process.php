<?php
  if (isset($_POST['email'])) {

  $email_to = "steve36lives@hotmail.com";
  $email_subject = "Contact from Portfolio web-site";

  function problem($error) {
    echo "There are some problems with your form data: <br><br>";
    echo $error . "<br><br>";
    echo "Please fix errors to proceed.<br><br>";
    die();
  }

  // validation expected data exists
  if (!isset($_POST['fullName']) || !isset($_POST['email']) || !isset($_POST['message'])) {
    problem('There are some problems with your form data');
  }

  $name = $_POST['fullName'];
  $email = $_POST['email'];
  $message = $_POST['message'];
  $error_message = "";
  $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

  if (!preg_match($email_exp, $email)) {
    $error_message .= 'Your e-mail address appears to be invalid<br>';
  }

  $string_exp = "/^[A-Za-z .'-]+$/";

  if (!preg_match($string_exp, $name)) {
    $error_message .= 'Name entered appears to be invalid<br>';
  }

  if (strlen($message) < 6) {
    $error_message .= 'Message should be 5 characters or more<br>';
  }

  if (strlen($error_message) > 0) {
    problem($error_message);
  }

  $email_message = "Form details following:\n\n";

  function clean_string($string) {
    $bad = array("content-type", "bcc:", "to:", "cc:", "href");
    return str_replace($bad, "", $string);
  }

  $email_message .= "Name: " . clean_string($name) . "\n";
  $email_message .= "Email: " . clean_string($email) . "\n";
  $email_message .= "Message: " . clean_string($message) . "\n";

  // Create e-mail headers
  $headers = 'From: ' . $email . "\r\n" .
    'Reply-To: ' . $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
  @mail($email_to, $email_subject, $email_message, $headers);
  ?>
Thanks for your message. Steve will get back to you as soon as possible.
<?php
  }
?>