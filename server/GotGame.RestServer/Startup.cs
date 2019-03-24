using GotGame.RestServer.DAL;
using GotGame.RestServer.Infrastructure.Consts;
using GotGame.RestServer.Infrastructure.Extensions;
using GotGame.RestServer.Infrastructure.Models;
using GotGame.RestServer.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace GotGame.RestServer
{
  public class Startup
  {
    private IConfiguration configuration;
    private IHostingEnvironment hostingEnvironment;
    private ILogger logger;
    private AppSettings appSettings;

    public Startup(IConfiguration config, IHostingEnvironment env, ILogger<Startup> logger)
    {
      configuration = config;
      hostingEnvironment = env;
      this.logger = logger;
      appSettings = config.GetAppSettings();
    }

    public void ConfigureServices(IServiceCollection services)
    {
      services
        .AddGoTCors(appSettings, logger)
        .AddGoTDatabase(configuration, hostingEnvironment, logger)
        .AddIdentity(configuration, hostingEnvironment)
        .AddAppSettings(configuration)
        .Configure<IISOptions>(options =>
        {
          options.AutomaticAuthentication = false;
        })
        .AddJwtHandler(configuration)
        .AddMvc().AddJsonOptions(options =>
        {
            options.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());
            options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
        });
    }

    public void Configure(IApplicationBuilder app)
    {
      app.UseCors(GotConsts.CorsPolicy)
        .MigrateDatabase(logger)
        .PopulateDatabase(logger)
        .UseDeveloperExceptionPage()
        .UseStatusCodePages()
        .UseStaticFiles()
        .UseAuthentication()
        .UseMvc(options =>
        {
          options.MapRoute("default", "{controller}/{action}", new { controller = "Home", action = "Index" });
        });
    }
  }
}
