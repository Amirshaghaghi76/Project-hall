namespace api.Controllers;

public class AccountController(IAccountRepository accountRepository) : BaseApiControllers
{
    private readonly IAccountRepository _accountRepository = accountRepository;

    [HttpPost("register")]

    // public async Task<ActionResult<AppUser>> Create(AppUser userInput){}
    public async Task<ActionResult<LoggedInDto>> CreateAsync(RegisterDto userInput, CancellationToken cancellationToken)
    {
        //if password dont match

        if (userInput.Password != userInput.ConfrimPassword)
            return BadRequest("Password dont match!");

        LoggedInDto? loggedInDto = await _accountRepository.CreateAsync(userInput, cancellationToken);

        if (loggedInDto is null)
        {
            return BadRequest("Email/User is Taken");
        }

        return loggedInDto;
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoggedInDto>> Login(LoginDto userInput)
    {
        var cancellationToken = CreateLinkedToken(10);
        var LoggedInDto = await _accountRepository.LoginAsync(userInput, cancellationToken);

        if (LoggedInDto == null)
            return BadRequest("Task failed");

        return Ok(LoggedInDto);
    }
}

