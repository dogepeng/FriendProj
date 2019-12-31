<html>
<body>

Welcome <?php echo $_POST["name"]; ?><br>
Your password is: <?php echo $_POST["pswrd"]; ?><br>
Your recovery email is: <?php echo $_POST["remail"];
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $emailErr = "Invalid email format";
} ?>
</body>
</html>
