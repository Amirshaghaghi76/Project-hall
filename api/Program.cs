using System.Text;
using api.Interfaces;
using api.Repositories;
using api.Services;
using api.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

#region  MongoDbSettings

///// get values from this file: appsettings.Development.json /////
// get section
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection(nameof(MongoDbSettings)));

// get values
builder.Services.AddSingleton<IMongoDbSettings>(serviceProvider =>
serviceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value);

// get connectionString to the db
builder.Services.AddSingleton<IMongoClient>(serviceProvider =>
{
    MongoDbSettings uri = serviceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value;

    return new MongoClient(uri.ConnectionString);
});

#endregion MongoDbSettings

#region Cors: baraye ta'eede Angular HttpClient requests
builder.Services.AddCors(options =>

    {
              options.AddDefaultPolicy(policy =>
            policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));
    });
#endregion Cors

#region Authentication & Authorization
string tokenValue = builder.Configuration["TokenKey"]!;

if (!string.IsNullOrEmpty(tokenValue))
{
    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenValue)),
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });
}


#endregion Authentication & Authorization

#region Dependency Injections
builder.Services.AddScoped<IAccountRepository,AccountRepository>();
builder.Services.AddScoped<IUserRepository,UserRepository>();

builder.Services.AddScoped<ITokenService,TokenService>();

#endregion Dependency Injections

// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();