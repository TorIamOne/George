using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
            .NotEmpty()
            .MinimumLength(6).WithMessage("Passord må være 6 bokstaver lang i det minst")
            .Matches("[A-Z]").WithMessage("Passord må innerholde 1 stor bokstav")
            .Matches("[a-z]").WithMessage("Passord må innerholde 1 liten bokstav")
            .Matches("[0-9]").WithMessage("Passord må innerholde 1 nummer")
            .Matches("[^a-zA-Z0-9]").WithMessage("Passord må innerholde ingen alfanumeriske tegn");

            return options;
        }
    }
}