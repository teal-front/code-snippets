### Exception and Error
> from: http://net-informations.com/faq/general/error.htm

Exceptions are those which can be handled at the run time whereas errors cannot be handled.

An exception is an Object of a type deriving from the System.Exception class. SystemException is thrown by the CLR (Common Language Runtime) when errors occur that are nonfatal and recoverable by user programs. It is meant to give you an opportunity to do something with throw statement to transfer control to a catch clause in a try block.

Exception syntax:
```js
try {
  //write your code here
} Catch (exception type) {
  //write your code here
}
```
An Error is something that most of the time you cannot handle it. Errors are unchecked exception and the developer is not required to do anything with these. Errors normally tend to signal the end of your program, it typically cannot be recovered from and should cause you exit from current program. It should not be caught or handled.

All the Errors are Exceptions but the reverse is not true. In general Errors are which nobody can control or guess when it happened, on the other hand Exception can be guessed and can be handled.

### Exception Handling

Exceptions are the occurrence of some condition that changes the normal flow of execution. In .NET languages , Structured Exceptions handling is a fundamental part of Common Language Runtime. More about.... Exception Handling

### How to create a custom exception

We can create our own exceptions by extending 'Exception' class. It will simplify and improve the error handling and thus increase the overall code quality. More about.... Create a custom exception

### NullReferenceException

A NullReferenceException exception is thrown when you try to access a member on a type whose value is null. That means the reference to an Object which is not initialized.