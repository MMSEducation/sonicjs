var dataService = require("../../../services/data.service");
var eventBusService = require("../../../services/event-bus.service");
var globalService = require("../../../services/global.service");

var sourceColumnId = undefined;
var titleModules = [];

module.exports = menuTitleMainService = {
  startup: async function() {
    eventBusService.on("beginProcessModuleShortCode", async function(options) {
      if (options.shortcode.name === "MENU-TITLE") {
        //TODO: don't process shortcode so that it can be processed after target columns has been built
        options.moduleName = "menu-title";
        await moduleService.processModuleInColumn(options);
        // console.log('titleModules beginProcessModuleShortCode',titleModules);

      }
    });

    eventBusService.on('postModuleGetData', async function (options) {

      if (options.shortcode.name === 'TITLE') {

        //TODO: how to delay processing of the module until after the module list is populated?
          titleModules.push(options.viewModel.data);
      }

      if (options.shortcode.name === 'MENU-TITLE') {

        //now we should have a complete list of title modules
          // console.log('titleModules post',titleModules);

          options.viewModel.data.headerTags = titleModules;
          // var headerTagsArr = Array.from(titleModules);
          // const names = titleModules.map(item => item.text)

          // for (var titleModule of titleModules){
          //   options.viewModel.data.headerTags.push(titleModule);
          // }

          // console.log(options.viewModel.data.headerTags);
      }

  });

    // eventBusService.on("postModuleGetData", async function(options) {
    //   if (options.shortcode.name !== "TITLE") {
    //     return;
    //   }

    //   sourceColumnId = options.viewModel.data.sourceColumnId;
    //   let sourceColumn = await menuTitleMainService.findColumnByHtmlId(
    //     options.section,
    //     sourceColumnId
    //   );
    //   console.log("sourceColumn", sourceColumn);
    //   let content =
    //     options.section.data.rows[options.rowIndex].columns[options.columnIndex]
    //       .content;
    //   options.viewModel.data.menu = "Lane";

    //   // console.log('contact module after view model', options.viewModel);
    //   globalService.pageContent;
    // });

    eventBusService.on("preRender", async function(options) {
      let x = sourceColumnId;
      globalService.pageContent;
    });
  },

  findColumnByHtmlId: async function(section, columnId) {
    for (const row of section.data.rows) {
      for (const column of row.columns) {
        if (column.id === columnId) {
          return column;
        }
      }
    }
  }

};